import { useState } from 'react';
import styles from './MainPanel.module.css';
import WhatFriendsSay from './WhatFriendsSay';
import NavTabs from './NavTabs';

interface MainPanelProps {
  roomImage: string;
  siteUrl: string;
}

export default function MainPanel({ roomImage, siteUrl }: MainPanelProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'profile'>('profile');

  return (
    <div className={styles.panel}>
      <div className={styles.outerCard}>
        <div className={styles.header}>
          <h1 className={styles.siteTitle}>Emoticons Factory</h1>
          <span className={styles.siteUrl}>{siteUrl}</span>
        </div>

        <div className={styles.innerCard}>
          <section className={styles.miniRoom}>
            <div className={styles.miniRoomHeader}>
              <h2 className={styles.miniRoomTitle}>Mini Room</h2>
              <span className={styles.miniRoomSubtitle}>Furniture &amp; Decor</span>
            </div>
            <div className={styles.miniRoomDivider} />
            <div className={styles.miniRoomImageWrap}>
              <img src={roomImage} alt="Mini Room" className={styles.miniRoomImage} />
            </div>
          </section>

          <WhatFriendsSay />
        </div>

        <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
