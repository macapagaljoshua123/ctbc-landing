export default function NoticeBar() {
  return (
    <div className="notice-bar">
      <div className="wrap">
        <span className="notice-bar__label">Notice</span>
        <p className="notice-bar__text">
          <strong>Regulated by BSP&nbsp;</strong>
          CTBC Bank (Philippines) Corp. is regulated by the Bangko Sentral ng Pilipinas. Financial Consumer Protection Dept.: (02) 8708-7087
        </p>
        <button className="notice-bar__report">Report</button>
      </div>
    </div>
  )
}
