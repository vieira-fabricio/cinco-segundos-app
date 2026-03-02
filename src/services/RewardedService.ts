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
  private hasEarnedReward = false;

  /* =====================
     Inicialização
  ====================== */

  private createAd() {

    this.isAdLoaded = false;
    this.hasEarnedReward = false;

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
          if (!this.hasEarnedReward) {

            this.hasEarnedReward = true;

            const callback = this.rewardCallback;
            this.rewardCallback = null;

            callback?.();
          }
          break;

        case AdEventType.CLOSED:
          console.log('[ADMOB] Rewarded fechado');
          this.cleanup();
          this.createAd();
          this.rewardedAd?.load();
          break;

        case AdEventType.ERROR:
          console.log('[ADMOB] Erro no Rewarded');
          this.cleanup();
          this.createAd();
          this.rewardedAd?.load();
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
    this.hasEarnedReward = false;
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

  public show(callback: RewardCallback) {
    if (!this.rewardedAd || !this.isAdLoaded) {
      console.warn('[ADMOB] Rewarded não está pronto');
      return;
    }

    this.rewardCallback = callback;

    this.rewardedAd.show();
  }
}

export const rewardedService = new RewardedService();