import { ValueObject } from "shared/domain";
import { Guard, Result } from "shared/core";

interface PriceProps {
  value: number;
}

export class Price extends ValueObject<PriceProps> {
  public static minValue = 0;
  public static maxValue = 99999;

  get value() {
    return this.props.value;
  }

  private constructor(props: PriceProps) {
    super(props);
  }

  public static create(props: PriceProps) {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, "price");

    if (!nullGuardResult.succeeded) {
      return Result.fail<Price>(nullGuardResult.message!);
    }

    const isNumberGuardResult = Guard.isNumber(props.value, "price");

    if (!isNumberGuardResult.succeeded) {
      return Result.fail<Price>(nullGuardResult.message!);
    }

    const isRangeGuardResult = Guard.inRange(
      props.value,
      this.minValue,
      this.maxValue,
      "price"
    );

    if (!isRangeGuardResult.succeeded) {
      return Result.fail<Price>(isRangeGuardResult.message!);
    }

    return Result.ok<Price>(new Price(props));
  }
}
