export class EnumArray extends Array {
  getLabel(value) {
    return this.find((item) => item?.value === value)?.label || '';
  }

  getValue(label) {
    return this.find((item) => item?.label === label)?.value || '';
  }

  getValues() {
    return this.map((item) => item.value);
  }

  getLabels() {
    return this.map((item) => item.label);
  }

  getItem(value) {
    return this.find((item) => item?.value === value) || {};
  }
}
