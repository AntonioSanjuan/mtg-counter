import styled from 'styled-components';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';

export interface ColorPickerStyleProps {
    rotation: number,
    playerHeight: number,
    playerWidth: number,
    backgroundColor?: PlayerColors
}

const SCColorPicker = styled.div.attrs<
ColorPickerStyleProps, // What is consumed by .attrs()
Required<ColorPickerStyleProps> // What comes out of .attrs()
>((props: ColorPickerStyleProps) => (
  {
    rotation: props.rotation ?? 0,
    playerHeight: props.playerHeight ?? 0,
    playerWidth: props.playerWidth ?? 0,
    backgroundColor: props.backgroundColor ?? PlayerColors.default,
  } as Required<ColorPickerStyleProps>
))`
display: flex;
height: 100%;
flex-direction: row;
flex-wrap: wrap;
align-items: center;
justify-content: center;
align-content: center;
padding-bottom: 5%;

gap: 10px;
`;

export default SCColorPicker;
