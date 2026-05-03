import styles from './NavTabs.module.css';

interface NavTabsProps {
  activeTab: 'home' | 'profile';
  onTabChange: (tab: 'home' | 'profile') => void;
}

export default function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${activeTab === 'home' ? styles.tabActive : ''}`}
        onClick={() => onTabChange('home')}
      >
        홈
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'profile' ? styles.tabActive : ''}`}
        onClick={() => onTabChange('profile')}
      >
        프로필
      </button>
    </div>
  );
}
