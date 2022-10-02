import './section.scss';

function Section({
  children, sectionName, color: itemsColor, onClickCallback,
} : {children: any, sectionName: string, color?: string, onClickCallback: any}) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="Section_Button"
      onKeyPress={() => { onClickCallback(); }}
      onClick={() => { onClickCallback(); }}
    >
      <div className="Section_MainContainer">
        <div className="Section_ImageContainer app_font_m" style={itemsColor ? { color: itemsColor } : undefined}>
          {children}
        </div>
        <div className="Section_DataContainer">
          <p className="app_font_m">{sectionName}</p>
        </div>
      </div>
    </div>
  );
}

export { Section };
