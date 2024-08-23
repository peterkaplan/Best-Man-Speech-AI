import React from 'react';
import { Save, Undo, Redo, Bold, Italic, Underline } from 'lucide-react';

export const DocumentHeader: React.FC = () => (
  <div className="bg-gray-100 border-b border-gray-200 p-2">
    <div className="flex items-center space-x-2">
      <button className="p-1 hover:bg-gray-200 rounded">
        <Save size={16} />
      </button>
      <button className="p-1 hover:bg-gray-200 rounded">
        <Undo size={16} />
      </button>
      <button className="p-1 hover:bg-gray-200 rounded">
        <Redo size={16} />
      </button>
      <div className="h-4 w-px bg-gray-300 mx-2" />
      <select className="text-sm bg-white border border-gray-300 rounded px-2 py-1">
        <option>Normal</option>
        <option>Heading 1</option>
        <option>Heading 2</option>
      </select>
      <select className="text-sm bg-white border border-gray-300 rounded px-2 py-1">
        <option>Arial</option>
        <option>Times New Roman</option>
        <option>Calibri</option>
      </select>
      <select className="text-sm bg-white border border-gray-300 rounded px-2 py-1">
        <option>11</option>
        <option>12</option>
        <option>14</option>
      </select>
      <div className="h-4 w-px bg-gray-300 mx-2" />
      <button className="p-1 hover:bg-gray-200 rounded">
        <Bold size={16} />
      </button>
      <button className="p-1 hover:bg-gray-200 rounded">
        <Italic size={16} />
      </button>
      <button className="p-1 hover:bg-gray-200 rounded">
        <Underline size={16} />
      </button>
    </div>
  </div>
);