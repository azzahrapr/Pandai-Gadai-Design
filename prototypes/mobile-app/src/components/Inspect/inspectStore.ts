let _id = 0
const _els: Map<number, Element> = new Map()
const _strs: Map<number, string> = new Map()

export const inspectStore = {
  setEl(el: Element): number { const id = ++_id; _els.set(id, el); return id },
  setStr(s: string): number { const id = ++_id; _strs.set(id, s); return id },
  getEl(id: number): Element | undefined { return _els.get(id) },
  getStr(id: number): string | undefined { return _strs.get(id) },
}
