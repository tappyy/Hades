import nanoid from 'nanoid'
import { toast_types } from '../utils/constants'

const defaultOptions = {
  type: toast_types.INFO,
  duration: 5
};

export default function createToast(options) {
  return {
    id: nanoid(),
    ...defaultOptions,
    ...options
  }
}