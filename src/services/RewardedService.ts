import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

class RewardedService {
  private rewardedAd: RewardedAd | null = null;
  private loaded = false;
  private onRewardCallback: (() => void) | null = null;
  private unsubscribeFns: Array<() => void> = [];

  constructor() {
    this.createAd();
  }

  private createAd() {

    this.cleanupListeners();

    this.loaded = false;

    this.rewardedAd = RewardedAd.createForAdRequest(
        __DEV__ ? TestIds.REWARDED : 'ca-app-pub-3935068450266170/7343609214'
    );

    this.subscribeToEvents();
  }

  // Limpa listeners antigos
  private cleanupListeners() {
    this.unsubscribeFns.forEach(unsub => unsub());
    this.unsubscribeFns = [];
  }

  private subscribeToEvents() {
    if (!this.rewardedAd) return;

    this.unsubscribeFns.push(
      this.rewardedAd.addAdEventListener(
        RewardedAdEventType.LOADED,
        () => {
          console.log('[ADMOB] Rewarded carregado');
          this.loaded = true;
        }
      )
    );

    this.unsubscribeFns.push(
      this.rewardedAd.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        () => {
          console.log('[ADMOB] Recompensa concedida');
          this.onRewardCallback?.();
          this.onRewardCallback = null;
        }
      )
    );

    this.unsubscribeFns.push(
      this.rewardedAd.addAdEventListener(
        AdEventType.ERROR,
        error => {
          console.log('[ADMOB] Erro no Rewarded:', error);
          this.resetAd();
        }
      )
    );

    this.unsubscribeFns.push(
      this.rewardedAd.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          console.log('[ADMOB] Rewarded fechado');
          this.resetAd();
        }
      )
    );
  }

  private resetAd() {
    this.cleanupListeners();
    this.rewardedAd = null;
    this.loaded = false;
    this.onRewardCallback = null;
    this.createAd();
  }

  public isLoaded(): boolean {
    return this.loaded;
  }

  load() {
    if (!this.rewardedAd || this.loaded) return;
    this.rewardedAd.load();
  }

  public show(onReward: () => void) {
    if (!this.rewardedAd || !this.loaded) return;

    this.onRewardCallback = onReward;
    this.loaded = false;

    this.rewardedAd.show();
  }
}

export const rewardedService = new RewardedService();