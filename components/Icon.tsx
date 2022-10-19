import { FunctionComponent } from "react";
import EIcon from "../models/enums/EIcon";

type TIconProps = {
  name: EIcon;
  style?: any;
};

const Icon: FunctionComponent<TIconProps> = ({ name, style }: TIconProps) => {
  return (
    <svg data-icon={name} style={style}>
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
