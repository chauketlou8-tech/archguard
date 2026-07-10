export default function syntax_type_classifier(syntax: string): string {
    if (syntax.startsWith("import ")) return "ES Module";
    return "CommonJS Module";
}