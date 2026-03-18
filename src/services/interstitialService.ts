import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

class InterstitialService {

  private interstitial: InterstitialAd | null = null;
  private isLoaded = false;
  private unsubscribe: (() => void) | null = null;
  private closeCallback: (() => void) | null = null;

  private createAd() {

    this.interstitial = InterstitialAd.createForAdRequest(
      __DEV__
        ? TestIds.INTERSTITIAL
        : "ca-app-pub-3935068450266170/7343609214"
    );

    this.subscribe();
  }

  public isAdLoaded(): boolean {
    return this.isLoaded;
  }

  private subscribe() {

    if (!this.interstitial) return;

    // LOADED
    const unsubLoaded = this.interstitial.addAdEventListener(
        AdEventType.LOADED,
        () => {
         console.log("[ADMOB] Interstitial carregado");
         this.isLoaded = true;
        }
    );

    // CLOSED
    const unsubClosed = this.interstitial.addAdEventListener(
        AdEventType.CLOSED,
        () => {
         console.log("[ADMOB] Interstitial fechado");

         this.closeCallback?.();
         this.closeCallback = null;

         this.cleanup();

         this.createAd();
         this.interstitial?.load();
        }
    );

    // ERROR
    const unsubError = this.interstitial.addAdEventListener(
        AdEventType.ERROR,
        () => {
         console.log("[ADMOB] Erro no Interstitial");

         this.cleanup();

         this.createAd();
         this.interstitial?.load();
        }
    );

    this.unsubscribe = () => {
     unsubLoaded();
     unsubClosed();
     unsubError();
    };
  }

  private cleanup() {

    this.unsubscribe?.();
    this.unsubscribe = null;

    this.interstitial = null;
    this.isLoaded = false;
  }

  public load() {

    if (!this.interstitial) {
      this.createAd();
    }

    if (!this.isLoaded) {
      this.interstitial?.load();
    }
  }

  public show(onClose: () => void) {

    if (!this.interstitial || !this.isLoaded) {
      console.log("[ADMOB] Interstitial não pronto");
      onClose(); // fallback: navega mesmo sem ad
      return;
    }

    this.closeCallback = onClose;
    this.isLoaded = false;

    this.interstitial.show();
  }
}

export const interstitialService = new InterstitialService();