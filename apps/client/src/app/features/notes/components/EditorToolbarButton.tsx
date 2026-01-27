import { type Editor, useEditorState } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/app/lib/utils';
import { Bold, Heading, Italic, TextQuote, Code2 } from 'lucide-react';

export const EditorToolbarButton = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
      };
    },
  });

  return (
    <>
      <Button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={cn(
          editorState.isHeading2 ? 'text-primary hover:text-primary!' : ''
        )}
        size="lg"
        variant="ghost"
      >
        <Heading className="size-6 md:size-5" />{' '}
        <span className="hidden md:inline">Heading</span>
      </Button>
      <Button
        onClick={() => editor?.chain().focus().toggleBold().run()}
        size="lg"
        variant="ghost"
        className={cn(
          editorState.isBold ? 'text-primary hover:text-primary!' : ''
        )}
      >
        <Bold className="size-6 md:size-5" />{' '}
        <span className="hidden md:inline">Bold</span>
      </Button>
      <Button
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        size="lg"
        variant="ghost"
        className={cn(
          editorState.isItalic ? 'text-primary hover:text-primary!' : ''
        )}
      >
        <Italic className="size-6 md:size-5" />{' '}
        <span className="hidden md:inline">Italic</span>
      </Button>
      <Button
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        size="lg"
        variant="ghost"
        className={cn(
          editorState.isBlockquote ? 'text-primary hover:text-primary!' : ''
        )}
      >
        <TextQuote className="size-6 md:size-5" />{' '}
        <span className="hidden md:inline">Blockquote</span>
      </Button>
      <Button
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        size="lg"
        variant="ghost"
        className={cn(
          editorState.isCodeBlock ? 'text-primary hover:text-primary!' : ''
        )}
      >
        <Code2 className="size-6 md:size-5" />{' '}
        <span className="hidden md:inline">Code block</span>
      </Button>
    </>
  );
};
