import styles from './SidePanel.module.css';

interface SidePanelProps {
  todayCount: number;
  totalCount: number;
  profileImage: string;
  todayMood: string;
  ownerName: string;
  email: string;
}

export default function SidePanel({
  todayCount,
  totalCount,
  profileImage,
  todayMood,
  ownerName,
  email,
}: SidePanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.counter}>
        <span className={styles.counterLabel}>TODAY</span>
        <span className={styles.todayCount}>{todayCount.toLocaleString()}</span>
        <div className={styles.counterDivider} />
        <span className={styles.counterLabel}>TOTAL</span>
        <span className={styles.totalCount}>{totalCount.toLocaleString()}</span>
      </div>

      <div className={styles.middleCard}>
        <div className={styles.innerCard}>
          <div className={styles.profileCard}>
            <img src={profileImage} alt="프로필" className={styles.profileImage} />
          </div>

          <div className={styles.todayIs}>
            <span className={styles.todayIsLabel}>TODAY IS...</span>
            <span className={styles.todayIsMood}>{todayMood}</span>
          </div>

          <div className={styles.contact}>
            <div className={styles.contactDivider} />
            <p className={styles.ownerName}>{ownerName}</p>
            <p className={styles.email}>{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
