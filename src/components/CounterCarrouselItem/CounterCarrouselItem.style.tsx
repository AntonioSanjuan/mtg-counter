import styled from 'styled-components';
import { textColors, textShadowBoxColors } from '../../utils/playerTextColors/playerTextColors';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { backgroundColors } from '../../utils/playerBackgroundColors/playerBackgroundColors';

export interface CounterCarrouselItemStyleProps {
    playerColor: PlayerColors
    counterOpponentColor: PlayerColors
}

const SCCounterCarrouselItem = styled.div.attrs<
CounterCarrouselItemStyleProps, // What is consumed by .attrs()
Required<CounterCarrouselItemStyleProps> // What comes out of .attrs()
>((props: CounterCarrouselItemStyleProps) => (
  {
    counterOpponentColor: props.counterOpponentColor ?? PlayerColors.default,
    playerColor: props.playerColor ?? PlayerColors.default,
  } as Required<CounterCarrouselItemStyleProps>
))`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 3px 10px;
    p {
        margin: 0;
        color:  ${(props) => (textColors[props.playerColor])};
    }

    i {
        color:  ${(props) => (textColors[props.playerColor])};
    }

    .CounterCarrousel_CommanderCounter {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        border: 1px solid ${(props) => (textColors[props.playerColor])};
        width: fit-content;
        padding: 0px 10px;
        background: ${(props) => (backgroundColors[props.counterOpponentColor])};

        p {
          color:  ${(props) => (textColors[props.counterOpponentColor])};
        }
    }
}
`;

export default SCCounterCarrouselItem;
