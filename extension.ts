import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.wrapInTemplateLiteral', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);

            const wrappedText = `\`${text}\``;

            editor.edit((editBuilder) => {
                editBuilder.replace(selection, wrappedText);
            });
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }

