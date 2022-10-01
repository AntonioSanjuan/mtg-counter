import './section.scss';

function Section({ children, sectionName, color: itemsColor } : {children: any, sectionName: string, color?: string}) {
  return (
    <div className="Section_MainContainer">
      <div className="Section_ImageContainer app_font_m" style={itemsColor ? { color: itemsColor } : undefined}>
        {children}
      </div>
      <div className="Section_DataContainer">
        <p className="app_font_m">{sectionName}</p>
      </div>
    </div>
  );
}

export { Section };
