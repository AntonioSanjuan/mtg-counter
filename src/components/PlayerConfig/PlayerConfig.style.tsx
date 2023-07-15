import styled from 'styled-components';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';

export interface PlayerConfigStyleProps {
    rotation: number,
    playerHeight: number,
    playerWidth: number,
    backgroundColor?: PlayerColors
}

const SCPlayerConfig = styled.div.attrs<
PlayerConfigStyleProps, // What is consumed by .attrs()
Required<PlayerConfigStyleProps> // What comes out of .attrs()
>((props: PlayerConfigStyleProps) => (
  {
    rotation: props.rotation ?? 0,
    playerHeight: props.playerHeight ?? 0,
    playerWidth: props.playerWidth ?? 0,
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
  text-shadow: 2px 0 var(--app-hight-contrast), -2px 0 var(--app-hight-contrast), 0 2px var(--app-hight-contrast), 0 -2px var(--app-hight-contrast),
  1px 1px var(--app-hight-contrast), -1px -1px var(--app-hight-contrast), 1px -1px var(--app-hight-contrast), -1px 1px var(--app-hight-contrast);
  i {
    font-size: 20px;
    color: var(--app-low-contrast)
  }}

.PlayerConfig_OwnerButton {
  position: absolute;
  top: calc(50% - 20px);
  right: 5px;
  z-index: 3;
  text-shadow: 2px 0 var(--app-hight-contrast), -2px 0 var(--app-hight-contrast), 0 2px var(--app-hight-contrast), 0 -2px var(--app-hight-contrast),
  1px 1px var(--app-hight-contrast), -1px -1px var(--app-hight-contrast), 1px -1px var(--app-hight-contrast), -1px 1px var(--app-hight-contrast);
  i {
    font-size: 20px;
    color: var(--app-low-contrast)
  }}
`;

export default SCPlayerConfig;
