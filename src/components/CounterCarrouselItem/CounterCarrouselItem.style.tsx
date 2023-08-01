import styled from 'styled-components';
import { textColors } from '../../utils/playerTextColors/playerTextColors';
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
}
`;

export default SCCounterCarrouselItem;
