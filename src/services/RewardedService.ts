import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

class RewardedService {
  private rewardedAd: RewardedAd | null = null;
  private loaded = false;
  private unsubscribeFns: Array<() => void> = [];

  constructor() {
    this.createAd();
  }

  private createAd() {

    // Limpa listeners antigos
    this.unsubscribeFns.forEach(unsub => unsub());
    this.unsubscribeFns = [];

    this.loaded = false;

    this.rewardedAd = RewardedAd.createForAdRequest(
        __DEV__ ? TestIds.REWARDED : 'ca-app-pub-3935068450266170/7343609214'
    );

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
        reward => {
          console.log('[ADMOB] Recompensa recebida:', reward);
        }
      )
    );

    this.unsubscribeFns.push(
      this.rewardedAd.addAdEventListener(
        AdEventType.ERROR,
        error => {
          console.log('[ADMOB] Erro no Rewarded:', error);
          this.loaded = false;
        }
      )
    );
  }

  public isLoaded(): boolean {
    return this.loaded;
  }

  load() {
    if (!this.loaded) {
      this.rewardedAd?.load();
    }
  }

  public show(onReward: () => void) {
    if (!this.loaded || !this.rewardedAd) return;

    this.rewardedAd.show();
    this.loaded = false;

    const unsubscribe = this.rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        onReward();
        unsubscribe();
      }
    );
  }
}

export const rewardedService = new RewardedService();