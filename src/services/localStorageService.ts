class Service {
  private _value = '';

  set value(data: string) {
    this._value = data;
    localStorage.setItem('task', this._value);
  }

  get value(): string {
    this._value = localStorage.getItem('task') || '';
    return this._value;
  }
}
const LSService = new Service();
export default LSService;
