import types from "./type";

export const GET = (payload) => ({
  type: types.GET,
  payload,
});

export const SET = (payload) => ({
  type: types.SET,
  payload,
});

export const UPDATE = (payload) => ({
  type: types.UPDATE,
  payload,
});

export const DELETE = (payload) => ({
  type: types.DELETE,
  payload,
});
