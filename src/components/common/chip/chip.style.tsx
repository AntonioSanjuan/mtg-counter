import styled from 'styled-components';
import { PlayerColors } from '../../../models/internal/types/PlayerColorEnum.model';
import { textColors } from '../../../utils/playerTextColors/playerTextColors';
import { backgroundColors } from '../../../utils/playerBackgroundColors/playerBackgroundColors';

export interface ChipStyleProps {
    backgroundColor: PlayerColors
    width?: string,
}

const SCChip = styled.div.attrs<
ChipStyleProps, // What is consumed by .attrs()
Required<ChipStyleProps> // What comes out of .attrs()
>((props: ChipStyleProps) => (
  {
    backgroundColor: props.backgroundColor ?? PlayerColors.default,
    width: props.width ?? 'fit-content',
  } as Required<ChipStyleProps>
))`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
border-radius: 10px;
border: 1px solid ${(props) => (textColors[props.backgroundColor])};
width: ${(props) => (props.width)};
padding: 0px 10px;
background: ${(props) => (backgroundColors[props.backgroundColor])};

p {
  width: 100%;
  color: ${(props) => (textColors[props.backgroundColor])} !important;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;

export default SCChip;
