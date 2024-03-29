import styled from 'styled-components';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { textColors } from '../../utils/playerTextColors/playerTextColors';

export interface PlayerConfigStyleProps {
    backgroundColor?: PlayerColors
}

const SCPlayerConfig = styled.div.attrs<
PlayerConfigStyleProps, // What is consumed by .attrs()
Required<PlayerConfigStyleProps> // What comes out of .attrs()
>((props: PlayerConfigStyleProps) => (
  {
    backgroundColor: props.backgroundColor ?? PlayerColors.default,
  } as Required<PlayerConfigStyleProps>
))`
display: flex;
height: 100%;
position: relative;

flex-direction: row;
flex-wrap: wrap;
align-items: center;
justify-content: center;
align-content: center;
padding-bottom: 5%;

gap: 10px;

.PlayerConfig_DetailsButton {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 3;
  i {
    font-size: 20px;
    color: ${(props) => (textColors[props.backgroundColor])};
  }
}

.PlayerConfig_OwnerButton {
  position: absolute;
  bottom: 5px;
  right: 5px;
  z-index: 3;
  i {
    font-size: 20px;
    color: ${(props) => (textColors[props.backgroundColor])};  }}
`;

export default SCPlayerConfig;
