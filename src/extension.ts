import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const keywords = [
        "ORIGIN",
        "LENGTH",
        "AT"
    ];

    const blocks = [
        { name: "SECTIONS", documentation: "**SECTIONS {...}**\n\nDefines the layout of the output file. Specifies how input sections are mapped to output sections and where they are placed in memory" },
        { name: "MEMORY", documentation: "**MEMORY {...}**\n\nDefines the memory regions available for the output file. Specifies the name, origin, and length of each memory region" },
        { name: "PHDRS", documentation: "**PHDRS {...}**\n\nDefines the program headers for the output file. Specifies how sections are grouped into segments for execution" }
    ];

    const other = [
        { name: "BYTE", insertText: "${1:value}", documentation: "**BYTE(...)**\n\nDefine a byte value in the output file" },
        { name: "SHORT", insertText: "${1:value}", documentation: "**SHORT(...)**\n\nDefine a 16-bit value in the output file" },
        { name: "LONG", insertText: "${1:value}", documentation: "**LONG(...)**\n\nDefine a 32-bit value in the output file" },
        { name: "QUAD", insertText: "${1:value}", documentation: "**QUAD(...)**\n\nDefine a 64-bit value in the output file" },
        { name: "SQUAD", insertText: "${1:value}", documentation: "**SQUAD(...)**\n\nDefine a 128-bit value in the output file" },
        
        { name: "ADDR", insertText: "${1:section}", documentation: "**ADDR(...)**\n\nReturns the address of a section" },
        { name: "SIZEOF", insertText: "${1:section}", documentation: "**SIZEOF(...)**\n\nReturns the size of a section" }
    ];

    const functions = [
        { name: "ENTRY", insertText: "(${1|main,_start|})", documentation: "**ENTRY(...)**\n\nDefine the entry point of the program" },
        { name: "OUTPUT_ARCH", insertText: "(${1|i386,iamcu,elf_x86_64,elf32_x86_64,elf_i386,elf_iamcu,i386pep,i386pe|})", documentation: "**OUTPUT_ARCH(...)**\n\nSpecify the output architecture" },
        { name: "OUTPUT_FORMAT", insertText: "(${1|binary,elf32-i386,elf64-x86-64,elf64-i386,elf32-x86-64,pe-i386,pe-x86-64|})", documentation: "**OUTPUT_FORMAT(...)**\n\nSpecify the output format" },
        { name: "ALIGN", insertText: "(${1:alignment})", documentation: "**ALIGN(...)**\n\nAlign the next section to a specified boundary" },
        { name: "KEEP", insertText: "(${1:section})", documentation: "**KEEP(...)**\n\nPrevent linker from discarding a section" },
        { name: "PROVIDE", insertText: "(${1:symbol} = ${2:value})", documentation: "**PROVIDE(...)**\n\nDefine a symbol if it is not already defined" },

        { name: "GROUP", insertText: "(${1:file1} ${2:file2})", documentation: "**GROUP(...)**\n\nGroups input files together in memory. The linker will treat these files as a single unit when placing sections" }
    ];

    const keywordItems = keywords.map(word => {
        const item = new vscode.CompletionItem(word, vscode.CompletionItemKind.Keyword);
        item.detail = "LinkerScript keyword";
        return item;
    });

    const blockItems = blocks.map(block => {
        const item = new vscode.CompletionItem(block.name, vscode.CompletionItemKind.Module);
        item.insertText = new vscode.SnippetString(block.name + ' {\n\t${1:}\n}');
        item.documentation = new vscode.MarkdownString(block.documentation);
        item.detail = "LinkerScript block";
        return item;
    });

    const otherItems = other.map(other => {
        const item = new vscode.CompletionItem(other.name, vscode.CompletionItemKind.Constant);
        item.insertText = new vscode.SnippetString(other.name + '(' + other.insertText + ')');
        item.documentation = new vscode.MarkdownString(other.documentation);
        item.detail = "LinkerScript output value";
        return item;
    });

    const functionItems = functions.map(func => {
        const item = new vscode.CompletionItem(func.name, vscode.CompletionItemKind.Function);
        item.insertText = new vscode.SnippetString(func.name + func.insertText);
        item.documentation = new vscode.MarkdownString(func.documentation);
        item.detail = "LinkerScript directive";
        return item;
    });

    vscode.languages.registerHoverProvider('linkerscript', {
        provideHover(document, position, _token) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);
            const item = [...keywordItems, ...blockItems, ...otherItems, ...functionItems].find(item => item.label === word);
            if (item) return new vscode.Hover(item.documentation || item.detail || word);
            return undefined;
        }
    });
    
    const provider = vscode.languages.registerCompletionItemProvider(
        'linkerscript', { provideCompletionItems() {
            return [...keywordItems, ...blockItems, ...otherItems, ...functionItems];
        }}
    );

    context.subscriptions.push(provider);
}

export function deactivate() {}