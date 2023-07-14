import styled from 'styled-components';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { textColors, textShadowBoxColors } from '../../utils/playerTextColors/playerTextColors';

export interface CounterCarrouselStyleProps {
    playerColor?: PlayerColors
}

const SCCounterCarrousel = styled.div.attrs<
CounterCarrouselStyleProps, // What is consumed by .attrs()
Required<CounterCarrouselStyleProps> // What comes out of .attrs()
>((props: CounterCarrouselStyleProps) => (
  {
    playerColor: props.playerColor ?? PlayerColors.default,
  } as Required<CounterCarrouselStyleProps>
))`
display: flex;
align-items: center;
justify-content: center;

height: 100%;
padding:  0px 20px;


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
        text-shadow: 2px 0 ${(props) => (textShadowBoxColors[props.playerColor])}, -2px 0 ${(props) => (textShadowBoxColors[props.playerColor])}, 0 2px ${(props) => (textShadowBoxColors[props.playerColor])}, 0 -2px ${(props) => (textShadowBoxColors[props.playerColor])},
             1px 1px ${(props) => (textShadowBoxColors[props.playerColor])}, -1px -1px ${(props) => (textShadowBoxColors[props.playerColor])}, 1px -1px ${(props) => (textShadowBoxColors[props.playerColor])}, -1px 1px ${(props) => (textShadowBoxColors[props.playerColor])};
        i{
            font-size: 25px;
            color: var(--app-hight-contrast);
        }
    }
}


.CounterCarrousel_Carrousel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70%;
    width: 40%;
    user-select: none; /* Standard syntax */

    .CounterCarrousel_CarrouselItemContainer {
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
    padding: 0 10px;
    p {
        margin: 0;
        color:  ${(props) => (textColors[props.playerColor])};

        text-shadow: 2px 0 ${(props) => (textShadowBoxColors[props.playerColor])}, -2px 0 ${(props) => (textShadowBoxColors[props.playerColor])}, 0 2px ${(props) => (textShadowBoxColors[props.playerColor])}, 0 -2px ${(props) => (textShadowBoxColors[props.playerColor])},
             1px 1px ${(props) => (textShadowBoxColors[props.playerColor])}, -1px -1px ${(props) => (textShadowBoxColors[props.playerColor])}, 1px -1px ${(props) => (textShadowBoxColors[props.playerColor])}, -1px 1px ${(props) => (textShadowBoxColors[props.playerColor])};
    }

    i {
        color:  ${(props) => (textShadowBoxColors[props.playerColor])};

        text-shadow: 2px 0 ${(props) => (textColors[props.playerColor])}, -2px 0 ${(props) => (textColors[props.playerColor])}, 0 2px ${(props) => (textColors[props.playerColor])}, 0 -2px ${(props) => (textColors[props.playerColor])},
             1px 1px ${(props) => (textColors[props.playerColor])}, -1px -1px ${(props) => (textColors[props.playerColor])}, 1px -1px ${(props) => (textColors[props.playerColor])}, -1px 1px ${(props) => (textColors[props.playerColor])};
    }
}
`;

export default SCCounterCarrousel;
