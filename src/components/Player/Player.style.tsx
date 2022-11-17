import styled from 'styled-components';
import { PlayerBackgroundColor } from '../../models/internal/types/PlayerBackgroundColor.model';

export interface PlayerStyleProps {
    rotation: number,
    playerHeight: number,
    playerWidth: number,
    backgroundColor?: PlayerBackgroundColor
}

const backgroundColors: Record<PlayerBackgroundColor, string> = {
  [PlayerBackgroundColor.red]: 'var(--PlayerBackgroundColorRed)',
  [PlayerBackgroundColor.blue]: 'var(--PlayerBackgroundColorBlue)',
  [PlayerBackgroundColor.white]: 'var(--PlayerBackgroundColorWhite)',
};

const SCPlayer = styled.div.attrs<
PlayerStyleProps, // What is consumed by .attrs()
Required<PlayerStyleProps> // What comes out of .attrs()
>((props: PlayerStyleProps) => (
  {
    rotation: props.rotation ?? 0,
    playerHeight: props.playerHeight ?? 0,
    playerWidth: props.playerWidth ?? 0,
    backgroundColor: props.backgroundColor ?? PlayerBackgroundColor.white,
  } as Required<PlayerStyleProps>
))`
display: flex;
height: 100%;
align-items: center;
justify-content: center;

position: relative;

background: ${(props) => (backgroundColors[props.backgroundColor])};
transform: ${(props) => (`rotate(${props.rotation}deg)`)};
transform-origin: center;
height: ${(props) => (props.playerHeight)}px;
min-width: ${(props) => (props.playerWidth)}px;

.Player_ConfigButton {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  i {
    font-size: 20px;
  }
}
`;

export default SCPlayer;
