import { Container } from "../Container";

type Segment = {
  className: string;
  paddingTop?: boolean;
  container?: boolean;
  children: React.ReactNode;
};

export const Segment = ({ container = true, ...props }: Segment) => {
  return (
    <div className={props.paddingTop ? `${props.className} page-content` : props.className}>
      {container ? (
        <Container>
          <div className={`${props.className}__inner`}>{props.children}</div>
        </Container>
      ) : (
        <div className={`${props.className}__inner`}>{props.children}</div>
      )}
    </div>
  );
};
