import styled from 'styled-components';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import backgroundColors from '../../utils/playerBackgroundColors/playerBackgroundColors';

export interface ColorSelectorStyleProps {
    color?: PlayerColors
}

const SCColorSelector = styled.button.attrs<
ColorSelectorStyleProps, // What is consumed by .attrs()
Required<ColorSelectorStyleProps> // What comes out of .attrs()
>((props: ColorSelectorStyleProps) => (
  {
    color: props.color,
  } as Required<ColorSelectorStyleProps>
))`
background: ${(props) => (backgroundColors[props.color])};
width: 30px;
height: 30px;
border-radius: 50vh;

`;

export default SCColorSelector;
