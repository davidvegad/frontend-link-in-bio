'use client';

import { useState, useCallback, useRef } from 'react';
import { 
  DragDropContext, 
  Droppable, 
  Draggable, 
  DroppableProvided,
  DraggableProvided,
  DropResult 
} from '@hello-pangea/dnd';
import {
  Plus,
  GripVertical,
  Trash2,
  Edit3,
  Settings,
  Eye,
  Save,
  Type,
  Image as ImageIcon,
  Link as LinkIcon,
  Video,
  MapPin,
  Calendar,
  Star,
  Users,
  Mail,
  Phone,
  Copy,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'link' | 'video' | 'map' | 'calendar' | 'social' | 'contact' | 'testimonial' | 'divider';
  content: any;
  styles?: {
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string;
    padding?: string;
    margin?: string;
    textAlign?: 'left' | 'center' | 'right';
    fontSize?: string;
    fontWeight?: string;
  };
  settings?: {
    visible?: boolean;
    animation?: string;
    clickTracking?: boolean;
  };
}

const blockTypes = [
  { type: 'text', label: 'Texto', icon: Type, description: 'Párrafo o título' },
  { type: 'image', label: 'Imagen', icon: ImageIcon, description: 'Foto o ilustración' },
  { type: 'link', label: 'Enlace', icon: LinkIcon, description: 'Botón o enlace' },
  { type: 'video', label: 'Video', icon: Video, description: 'Video embebido' },
  { type: 'map', label: 'Mapa', icon: MapPin, description: 'Ubicación' },
  { type: 'calendar', label: 'Calendario', icon: Calendar, description: 'Agenda o eventos' },
  { type: 'social', label: 'Social', icon: Users, description: 'Redes sociales' },
  { type: 'contact', label: 'Contacto', icon: Mail, description: 'Información de contacto' },
  { type: 'testimonial', label: 'Testimonio', icon: Star, description: 'Reseña o testimonio' }
];

interface DragDropEditorProps {
  initialBlocks?: ContentBlock[];
  onSave?: (blocks: ContentBlock[]) => void;
  className?: string;
}

export default function DragDropEditor({
  initialBlocks = [],
  onSave,
  className
}: DragDropEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialBlocks);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateId = () => `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const createBlock = (type: ContentBlock['type']): ContentBlock => {
    const baseBlock = {
      id: generateId(),
      type,
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center' as const
      },
      settings: {
        visible: true,
        clickTracking: true
      }
    };

    switch (type) {
      case 'text':
        return {
          ...baseBlock,
          content: {
            text: 'Nuevo texto',
            tag: 'p'
          }
        };
      case 'image':
        return {
          ...baseBlock,
          content: {
            src: '/placeholder-image.jpg',
            alt: 'Imagen',
            caption: ''
          }
        };
      case 'link':
        return {
          ...baseBlock,
          content: {
            text: 'Nuevo enlace',
            url: '#',
            target: '_blank'
          }
        };
      case 'video':
        return {
          ...baseBlock,
          content: {
            url: '',
            title: 'Video',
            thumbnail: ''
          }
        };
      case 'contact':
        return {
          ...baseBlock,
          content: {
            email: 'contacto@ejemplo.com',
            phone: '+1 234 567 890',
            address: 'Dirección opcional'
          }
        };
      case 'social':
        return {
          ...baseBlock,
          content: {
            platforms: [
              { name: 'Instagram', url: '', icon: 'instagram' },
              { name: 'Twitter', url: '', icon: 'twitter' }
            ]
          }
        };
      default:
        return {
          ...baseBlock,
          content: {}
        };
    }
  };

  const handleDragEnd = (result: DropResult) => {
    setDraggedOverIndex(null);
    
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBlocks(items);
  };

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock = createBlock(type);
    setBlocks([...blocks, newBlock]);
    setSelectedBlock(newBlock.id);
    setIsAddingBlock(false);
  };

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
    if (selectedBlock === blockId) {
      setSelectedBlock(null);
    }
  };

  const duplicateBlock = (blockId: string) => {
    const blockToDuplicate = blocks.find(block => block.id === blockId);
    if (blockToDuplicate) {
      const duplicatedBlock = {
        ...blockToDuplicate,
        id: generateId()
      };
      const blockIndex = blocks.findIndex(block => block.id === blockId);
      const newBlocks = [...blocks];
      newBlocks.splice(blockIndex + 1, 0, duplicatedBlock);
      setBlocks(newBlocks);
    }
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const blockIndex = blocks.findIndex(block => block.id === blockId);
    if (
      (direction === 'up' && blockIndex === 0) ||
      (direction === 'down' && blockIndex === blocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1;
    [newBlocks[blockIndex], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[blockIndex]];
    setBlocks(newBlocks);
  };

  const updateBlockContent = (blockId: string, content: any) => {
    setBlocks(blocks.map(block =>
      block.id === blockId ? { ...block, content: { ...block.content, ...content } } : block
    ));
  };

  const updateBlockStyles = (blockId: string, styles: any) => {
    setBlocks(blocks.map(block =>
      block.id === blockId ? { ...block, styles: { ...block.styles, ...styles } } : block
    ));
  };

  const handleSave = () => {
    onSave?.(blocks);
  };

  const selectedBlockData = selectedBlock ? blocks.find(block => block.id === selectedBlock) : null;

  return (
    <div className={cn('flex h-screen bg-gray-100', className)}>
      {/* Sidebar - Block Library */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Editor de Contenido</h2>
          <p className="text-sm text-gray-600">Arrastra y suelta para crear tu página</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Add Block Section */}
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={() => setIsAddingBlock(!isAddingBlock)}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Añadir Bloque
            </button>

            {isAddingBlock && (
              <div className="mt-4 space-y-2">
                {blockTypes.map(blockType => {
                  const Icon = blockType.icon;
                  return (
                    <button
                      key={blockType.type}
                      onClick={() => addBlock(blockType.type as ContentBlock['type'])}
                      className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <Icon className="w-5 h-5 mr-3 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">{blockType.label}</div>
                        <div className="text-sm text-gray-600">{blockType.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Block Properties */}
          {selectedBlockData && (
            <BlockPropertiesPanel
              block={selectedBlockData}
              onUpdateContent={updateBlockContent}
              onUpdateStyles={updateBlockStyles}
            />
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Editar' : 'Vista Previa'}
          </button>
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="font-semibold text-gray-900">
                {previewMode ? 'Vista Previa' : 'Editor'}
              </h3>
              <span className="text-sm text-gray-500">
                {blocks.length} bloque{blocks.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg min-h-full">
            {previewMode ? (
              <PreviewCanvas blocks={blocks} />
            ) : (
              <EditCanvas
                blocks={blocks}
                selectedBlock={selectedBlock}
                onSelectBlock={setSelectedBlock}
                onDeleteBlock={deleteBlock}
                onDuplicateBlock={duplicateBlock}
                onMoveBlock={moveBlock}
                onDragEnd={handleDragEnd}
                draggedOverIndex={draggedOverIndex}
                onDraggedOverIndex={setDraggedOverIndex}
              />
            )}
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          // Handle image upload
          console.log('Image selected:', e.target.files?.[0]);
        }}
      />
    </div>
  );
}

// Edit Canvas Component
function EditCanvas({
  blocks,
  selectedBlock,
  onSelectBlock,
  onDeleteBlock,
  onDuplicateBlock,
  onMoveBlock,
  onDragEnd,
  draggedOverIndex,
  onDraggedOverIndex
}: {
  blocks: ContentBlock[];
  selectedBlock: string | null;
  onSelectBlock: (id: string) => void;
  onDeleteBlock: (id: string) => void;
  onDuplicateBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  onDragEnd: (result: DropResult) => void;
  draggedOverIndex: number | null;
  onDraggedOverIndex: (index: number | null) => void;
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="blocks">
        {(provided: DroppableProvided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="p-4 min-h-full"
          >
            {blocks.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <div className="mb-4">
                  <Plus className="w-12 h-12 mx-auto text-gray-300" />
                </div>
                <p>Añade tu primer bloque para empezar</p>
              </div>
            )}

            {blocks.map((block, index) => (
              <Draggable key={block.id} draggableId={block.id} index={index}>
                {(provided: DraggableProvided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={cn(
                      'relative group mb-4 last:mb-0',
                      selectedBlock === block.id && 'ring-2 ring-blue-500 ring-offset-2',
                      snapshot.isDragging && 'rotate-2 shadow-2xl',
                      draggedOverIndex === index && 'border-t-4 border-blue-500'
                    )}
                    onClick={() => onSelectBlock(block.id)}
                  >
                    {/* Drag Handle */}
                    <div
                      {...provided.dragHandleProps}
                      className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10"
                    >
                      <GripVertical className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Block Content */}
                    <div className="relative">
                      <BlockRenderer block={block} isEditing={true} />

                      {/* Block Controls */}
                      {selectedBlock === block.id && (
                        <div className="absolute -top-10 right-0 flex items-center space-x-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onMoveBlock(block.id, 'up');
                            }}
                            disabled={index === 0}
                            className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onMoveBlock(block.id, 'down');
                            }}
                            disabled={index === blocks.length - 1}
                            className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDuplicateBlock(block.id);
                            }}
                            className="p-1 text-gray-600 hover:text-gray-900"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteBlock(block.id);
                            }}
                            className="p-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

// Preview Canvas Component
function PreviewCanvas({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="p-4">
      {blocks.map((block) => (
        <div key={block.id} className="mb-4 last:mb-0">
          <BlockRenderer block={block} isEditing={false} />
        </div>
      ))}
    </div>
  );
}

// Block Renderer Component
function BlockRenderer({ block, isEditing }: { block: ContentBlock; isEditing: boolean }) {
  const styles = {
    backgroundColor: block.styles?.backgroundColor,
    color: block.styles?.textColor,
    borderRadius: block.styles?.borderRadius,
    padding: block.styles?.padding,
    textAlign: block.styles?.textAlign,
    fontSize: block.styles?.fontSize,
    fontWeight: block.styles?.fontWeight
  };

  switch (block.type) {
    case 'text':
      return (
        <div style={styles} className="transition-all duration-200">
          {block.content.tag === 'h1' && (
            <h1 className="text-3xl font-bold">{block.content.text}</h1>
          )}
          {block.content.tag === 'h2' && (
            <h2 className="text-2xl font-bold">{block.content.text}</h2>
          )}
          {block.content.tag === 'h3' && (
            <h3 className="text-xl font-bold">{block.content.text}</h3>
          )}
          {block.content.tag === 'p' && (
            <p>{block.content.text}</p>
          )}
        </div>
      );

    case 'image':
      return (
        <div style={styles} className="transition-all duration-200">
          <img
            src={block.content.src}
            alt={block.content.alt}
            className="w-full h-auto rounded-lg"
          />
          {block.content.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center">{block.content.caption}</p>
          )}
        </div>
      );

    case 'link':
      return (
        <div style={styles} className="transition-all duration-200">
          <a
            href={isEditing ? '#' : block.content.url}
            target={block.content.target}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={isEditing ? (e) => e.preventDefault() : undefined}
          >
            {block.content.text}
          </a>
        </div>
      );

    case 'contact':
      return (
        <div style={styles} className="transition-all duration-200 space-y-2">
          {block.content.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span>{block.content.email}</span>
            </div>
          )}
          {block.content.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>{block.content.phone}</span>
            </div>
          )}
          {block.content.address && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{block.content.address}</span>
            </div>
          )}
        </div>
      );

    default:
      return (
        <div style={styles} className="transition-all duration-200 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-600">
          Bloque de tipo: {block.type}
        </div>
      );
  }
}

// Block Properties Panel Component
function BlockPropertiesPanel({
  block,
  onUpdateContent,
  onUpdateStyles
}: {
  block: ContentBlock;
  onUpdateContent: (blockId: string, content: any) => void;
  onUpdateStyles: (blockId: string, styles: any) => void;
}) {
  return (
    <div className="p-4 border-b border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
        <Edit3 className="w-4 h-4 mr-2" />
        Propiedades del Bloque
      </h3>

      {/* Content Properties */}
      <div className="space-y-4">
        {block.type === 'text' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Texto</label>
            <textarea
              value={block.content.text || ''}
              onChange={(e) => onUpdateContent(block.id, { text: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              rows={3}
            />
            <select
              value={block.content.tag || 'p'}
              onChange={(e) => onUpdateContent(block.id, { tag: e.target.value })}
              className="mt-2 w-full p-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="p">Párrafo</option>
              <option value="h1">Título 1</option>
              <option value="h2">Título 2</option>
              <option value="h3">Título 3</option>
            </select>
          </div>
        )}

        {block.type === 'link' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto del enlace</label>
              <input
                type="text"
                value={block.content.text || ''}
                onChange={(e) => onUpdateContent(block.id, { text: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
              <input
                type="url"
                value={block.content.url || ''}
                onChange={(e) => onUpdateContent(block.id, { url: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        )}

        {/* Style Properties */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Estilos</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color de fondo</label>
              <input
                type="color"
                value={block.styles?.backgroundColor || '#ffffff'}
                onChange={(e) => onUpdateStyles(block.id, { backgroundColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color de texto</label>
              <input
                type="color"
                value={block.styles?.textColor || '#1f2937'}
                onChange={(e) => onUpdateStyles(block.id, { textColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alineación</label>
              <select
                value={block.styles?.textAlign || 'center'}
                onChange={(e) => onUpdateStyles(block.id, { textAlign: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="left">Izquierda</option>
                <option value="center">Centro</option>
                <option value="right">Derecha</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}