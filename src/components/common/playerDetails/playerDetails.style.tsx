import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PlayerDetailsStyleProps {}

const SCPlayerDetails = styled.div.attrs<
PlayerDetailsStyleProps, // What is consumed by .attrs()
Required<PlayerDetailsStyleProps> // What comes out of .attrs()
>((props: PlayerDetailsStyleProps) => (
  {} as Required<PlayerDetailsStyleProps>
))`

.PlayerDetails_Header {
  display: flex;
  justify-content: center;
}

form > div {
  padding-bottom: 10px;
}

.form-floating>label {
  position: inherit;
  padding: 0;
  width: 100%;
  pointer-events: auto;
}
.PlayerDetails_UserIdContainer {
  display: flex;
}

`;

export default SCPlayerDetails;
