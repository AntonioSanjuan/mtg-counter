import styled from 'styled-components';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { textColors, textShadowBoxColors } from '../../utils/playerTextColors/playerTextColors';

export interface CounterCarrouselStyleProps {
    playerColor?: PlayerColors
    isResume?: boolean
}

const SCCounterCarrousel = styled.div.attrs<
CounterCarrouselStyleProps, // What is consumed by .attrs()
Required<CounterCarrouselStyleProps> // What comes out of .attrs()
>((props: CounterCarrouselStyleProps) => (
  {
    playerColor: props.playerColor ?? PlayerColors.default,
    isResume: props.isResume ?? false,
  } as Required<CounterCarrouselStyleProps>
))`
display: flex;
align-items: center;
justify-content: center;

height: 100%;
padding:  0px 20px;
overflow: hidden;

.CounterCarrousel_ActionContainer {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    button {
        color: var(--app-low-contrast);
        height: 70%;
        padding: 0;
        width: 100%;
        
        i{
            font-size: 25px;
            color: ${(props) => (textColors[props.playerColor])};
        }
    }
}


.CounterCarrousel_Carrousel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70%;
    width: ${(props) => (props.isResume ? '100%' : '40%')};
    user-select: none; /* Standard syntax */

    .CounterCarrousel_CarrouselItemContainer {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        height: 135px;
    }
}

.CounterCarrousel_TemporaryCount {
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        color:  ${(props) => (textColors[props.playerColor])};
        text-shadow: 2px 0 ${(props) => (textShadowBoxColors[props.playerColor])}, -2px 0 ${(props) => (textShadowBoxColors[props.playerColor])}, 0 2px ${(props) => (textShadowBoxColors[props.playerColor])}, 0 -2px ${(props) => (textShadowBoxColors[props.playerColor])},
             1px 1px ${(props) => (textShadowBoxColors[props.playerColor])}, -1px -1px ${(props) => (textShadowBoxColors[props.playerColor])}, 1px -1px ${(props) => (textShadowBoxColors[props.playerColor])}, -1px 1px ${(props) => (textShadowBoxColors[props.playerColor])};
    }
}

.CounterCarrousel_CarrouselItem {
    
`;

export default SCCounterCarrousel;
