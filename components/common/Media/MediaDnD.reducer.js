const ADD_MEDIA = 'MediaDnD/ADD_MEDIA';
const SET_MEDIA = 'MediaDnD/SET_MEDIA';
const CHANGE_ORDER = 'MediaDnD/CHANGE_ORDER';

export const addMediaAction = (payload) => ({
  type: ADD_MEDIA,
  payload,
});

export const setMediaAction = (payload) => ({
  type: SET_MEDIA,
  payload,
});

export const changeOrderAction = (targetKey, originKey) => ({
  type: CHANGE_ORDER,
  payload: { targetKey, originKey },
});

export const INITIAL_STATE = { mediaList: [] };

const MediaDnDReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_MEDIA:
      const combinedMediaList = [...state.mediaList, ...action.payload];
      // state.callbacks?.onFormChange?.(combinedMediaList);
      return {
        ...state,
        mediaList: combinedMediaList,
      };
    case SET_MEDIA:
      const replacedMediaList = [...action.payload];
      // state.callbacks?.onFormChange?.(replacedMediaList);
      return {
        ...state,
        mediaList: replacedMediaList,
      };
    case CHANGE_ORDER:
      const reorderedMediaList = _arrayMove(
        state.mediaList,
        state.mediaList.findIndex(
          (m) => m.getKey() === action.payload.targetKey
        ),
        state.mediaList.findIndex(
          (m) => m.getKey() === action.payload.originKey
        )
      );
      return { ...state, mediaList: reorderedMediaList };
    default:
      return state;
  }
};

const _arrayMove = (arr, targetIndex, originalIndex) => {
  if (
    targetIndex < 0 ||
    targetIndex >= arr.length ||
    originalIndex < 0 ||
    originalIndex >= arr.length
  )
    return arr;
  const element = arr[originalIndex];
  const reducedArr = [
    ...arr.slice(0, originalIndex),
    ...arr.slice(originalIndex + 1),
  ];
  const asd = [
    ...reducedArr.slice(0, targetIndex),
    element,
    ...reducedArr.slice(targetIndex),
  ];
  return asd;
};

export default MediaDnDReducer;
