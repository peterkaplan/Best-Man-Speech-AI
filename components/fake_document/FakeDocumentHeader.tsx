import React from 'react';
import { Save, Undo, Redo, Bold, Italic, Underline, Menu } from 'lucide-react';

/*
 * Decorative "document editor" chrome. None of these controls do anything —
 * they exist to make the preview read as a word processor. They are hidden
 * from the accessibility tree (aria-hidden + tabIndex -1) so screen readers
 * and browsing agents are not offered a toolbar of dead controls; naming them
 * would be worse, since the names would promise behaviour that isn't there.
 */
export const DocumentHeader: React.FC = () => (
  <div className="bg-muted border-b border-border p-2" aria-hidden="true">
    <div className="flex items-center justify-between gap-1 overflow-hidden">
      <div className="flex items-center space-x-1 flex-shrink-0">
        <button type="button" tabIndex={-1} className="p-1 hover:bg-accent rounded">
          <Save size={16} />
        </button>
        <button type="button" tabIndex={-1} className="p-1 hover:bg-accent rounded">
          <Undo size={16} />
        </button>
        <button type="button" tabIndex={-1} className="p-1 hover:bg-accent rounded">
          <Redo size={16} />
        </button>
      </div>
      <div className="flex items-center space-x-1 flex-1 justify-center min-w-0">
        <div className="h-4 w-px bg-border mx-2" />
        <select tabIndex={-1} className="text-xs bg-background border border-border rounded px-1 py-1 min-w-0 max-w-20">
          <option>Normal</option>
          <option>Heading 1</option>
          <option>Heading 2</option>
        </select>
        <select tabIndex={-1} className="text-xs bg-background border border-border rounded px-1 py-1 min-w-0 max-w-20">
          <option>Arial</option>
          <option>Times New Roman</option>
          <option>Calibri</option>
        </select>
        <select tabIndex={-1} className="text-xs bg-background border border-border rounded px-1 py-1 min-w-0 max-w-20">
          <option>11</option>
          <option>12</option>
          <option>14</option>
        </select>
        <div className="h-4 w-px bg-border mx-2" />
      </div>
      <div className="flex items-center space-x-1 flex-shrink-0">
        <button type="button" tabIndex={-1} className="p-1 hover:bg-accent rounded">
          <Bold size={16} />
        </button>
        <button type="button" tabIndex={-1} className="p-1 hover:bg-accent rounded">
          <Italic size={16} />
        </button>
        <button type="button" tabIndex={-1} className="p-1 hover:bg-accent rounded">
          <Underline size={16} />
        </button>
        <button type="button" tabIndex={-1} className="hidden p-1 hover:bg-accent rounded">
          <Menu size={16} />
        </button>
      </div>
    </div>
  </div>
);
