export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }
  /**
   *  Receives a tring and normalize it as  a slug.
   *
   * Example: "An example title" => "an-exanmple-title"
   *
   * @param text {string}
   */

  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLocaleLowerCase()
      .trim() // retirar espaçamento da direita ou esquerda
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}
