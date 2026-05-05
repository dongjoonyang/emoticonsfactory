import styles from './MiniroomPage.module.css';
import SidePanel from './components/SidePanel';
import MainPanel from './components/MainPanel';
import bgImage from '../../assets/cyworld-bg.png';
import profileImage from '../../assets/profile.png';
import roomImage from '../../assets/miniroom.png';

const BG_IMAGE = bgImage;
const PROFILE_IMAGE = profileImage;
const ROOM_IMAGE = roomImage;

export default function MiniroomPage() {
  return (
    <div className={styles.page}>
      <img className={styles.background} src={BG_IMAGE} alt="" aria-hidden="true" />
      <div className={styles.container}>
        <SidePanel
          todayCount={1234}
          totalCount={123456}
          profileImage={PROFILE_IMAGE}
          todayMood="즐거움"
          ownerName="이모티콘 팩토리"
          email="emoticons@factory.com"
        />
        <MainPanel roomImage={ROOM_IMAGE} siteUrl="https://mungfriends.com" />
      </div>
    </div>
  );
}
