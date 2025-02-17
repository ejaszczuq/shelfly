export type PathFunction = (...params: string[]) => string;

interface PathArguments {
  path: string;
  pathName?: string;
  tKey?: string;
  ref?: PathFunction;
}

export class Path {
  private _path: string;
  private _pathName?: string;
  private _tKey?: string;
  private _ref?: PathFunction;

  constructor({ path, pathName, tKey, ref }: PathArguments) {
    if (!path) {
      throw new Error("Path cannot be empty");
    }

    this._path = path;
    this._pathName = pathName;
    this._tKey = tKey;
    this._ref = ref;
  }

  get path(): string {
    return this._path;
  }

  get pathName(): string | undefined {
    return this._pathName;
  }

  get tKey(): string | undefined {
    return this._tKey;
  }

  set ref(refFunction: PathFunction | undefined) {
    this._ref = refFunction;
  }

  getPath(...params: string[]): string {
    return this._ref ? this._ref(...params) : this._path;
  }
}
