import { randomId } from '../utils/id';

export class Step {
  id = undefined;
  description = '';
  tempId = null;

  constructor(data = {}) {
    Object.assign(this, data);

    if (!this.id) {
      this.tempId = randomId();
    }
  }

  get idx() {
    return this.id || this.tempId;
  }

  toJSON() {
    return {
      id: this.id,
      description: this.description,
    };
  }
}
