export default class LSService {
  static setDataToLS(data: string) {
    localStorage.setItem('task', data);
  }

  static getDataLS(): string | null {
    return localStorage.getItem('task');
  }
}
