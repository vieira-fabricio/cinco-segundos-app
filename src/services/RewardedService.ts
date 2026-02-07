import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

type RewardCallback = () => void;

class RewardedService {
  private rewardedAd: RewardedAd | null = null;
  private isAdLoaded = false;
  private rewardCallback: RewardCallback | null = null;
  private unsubscribe: (() => void) | null = null;

  /* =====================
     Inicialização
  ====================== */

  private createAd() {

    this.isAdLoaded = false;

    this.rewardedAd = RewardedAd.createForAdRequest(
        __DEV__ 
        ? TestIds.REWARDED 
        : 'ca-app-pub-3935068450266170/7343609214'
    );

    this.subscribe();
  }

  private subscribe() {
    if (!this.rewardedAd) return;

    this.unsubscribe = this.rewardedAd.addAdEventsListener(event => {
      switch (event.type) {
        case RewardedAdEventType.LOADED:
          console.log('[ADMOB] Rewarded carregado');
          this.isAdLoaded = true;
          break;

        case RewardedAdEventType.EARNED_REWARD:
          console.log('[ADMOB] Recompensa concedida');
          this.rewardCallback?.();
          this.rewardCallback = null;
          break;

        case AdEventType.CLOSED:
          console.log('[ADMOB] Rewarded fechado');
          this.cleanup();
          this.createAd();
          break;

        case AdEventType.ERROR:
          console.log('[ADMOB] Erro no Rewarded');
          this.cleanup();
          this.createAd();
          break;
      }
    });
  }

  private cleanup() {
    this.unsubscribe?.();
    this.unsubscribe = null;
    this.rewardedAd = null;
    this.isAdLoaded = false;
    this.rewardCallback = null;
  }

  /* =====================
      API pública
  ====================== */

  public load() {
    if (!this.rewardedAd) {
      this.createAd();
    }

    if (!this.isAdLoaded) {
      this.rewardedAd?.load();
    }
  }

  public isLoaded(): boolean {
    return this.isAdLoaded;
  }

  public show(onReward: RewardCallback) {
    if (!this.rewardedAd || !this.isAdLoaded) {
      console.warn('[ADMOB] Rewarded não está pronto');
      return;
    }

    this.rewardCallback = onReward;
    this.isAdLoaded = false;

    this.rewardedAd.show();
  }
}

export const rewardedService = new RewardedService();