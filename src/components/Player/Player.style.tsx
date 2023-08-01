import styled from 'styled-components';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { backgroundColors } from '../../utils/playerBackgroundColors/playerBackgroundColors';
import { textColors } from '../../utils/playerTextColors/playerTextColors';

export interface PlayerStyleProps {
    rotation: number,
    playerHeight: number,
    playerWidth: number,
    isOwner: boolean,
    backgroundColor?: PlayerColors
}

const SCPlayer = styled.div.attrs<
PlayerStyleProps, // What is consumed by .attrs()
Required<PlayerStyleProps> // What comes out of .attrs()
>((props: PlayerStyleProps) => (
  {
    rotation: props.rotation ?? 0,
    playerHeight: props.playerHeight ?? 0,
    playerWidth: props.playerWidth ?? 0,
    backgroundColor: props.backgroundColor ?? PlayerColors.default,
  } as Required<PlayerStyleProps>
))`
display: flex;
height: 100%;
role: button;
align-items: center;
justify-content: center;

position: relative;

background: ${(props) => (backgroundColors[props.backgroundColor])};
transform: ${(props) => (`rotate(${props.rotation}deg)`)};
transform-origin: center;
height: ${(props) => (props.playerHeight ? `${props.playerHeight}px` : '100%')};
min-width: ${(props) => (props.playerWidth ? `${props.playerWidth}px` : '100%')};
width: ${(props) => (props.playerWidth ? `${props.playerWidth}px` : '100%')};
box-shadow: inset 0 0 75px var(--app-topnav-mobile-background);
border: ${(props) => (props.isOwner ? '5px outset var(--OwnerPlayerBackground)' : 'none')};

.PlayerName {
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 3;

  color: ${(props) => textColors[props.backgroundColor]}
}
.Player_ConfigButton {
  position: absolute;
  bottom: 5px;
  right: calc(50% - 22px);
  z-index: 3;
  i {
    font-size: 20px;
    color: ${(props) => textColors[props.backgroundColor]}
  }
}

.Player_NameContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0px;

  p, i {
    color: ${(props) => textColors[props.backgroundColor]}
  }
}
`;

export default SCPlayer;
