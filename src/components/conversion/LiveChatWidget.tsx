'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2, Phone, Mail, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface LiveChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
}

const predefinedResponses = [
  {
    keywords: ['hola', 'hello', 'hi', 'buenas'],
    response: '¡Hola! 👋 Soy el asistente virtual de EnlacePro. ¿En qué puedo ayudarte hoy?'
  },
  {
    keywords: ['precio', 'costo', 'cuanto', 'gratis'],
    response: '¡Nuestro plan básico es completamente GRATIS! 🎉 Incluye páginas ilimitadas y todas las funciones esenciales. También tenemos planes premium desde $9.99/mes con funciones avanzadas.'
  },
  {
    keywords: ['como', 'funciona', 'empezar'],
    response: 'Es súper fácil: 1️⃣ Te registras gratis, 2️⃣ Personalizas tu página con nuestro editor visual, 3️⃣ Compartes tu enlace único. ¡Listo en menos de 5 minutos!'
  },
  {
    keywords: ['plantillas', 'diseños', 'temas'],
    response: 'Tenemos más de 50 plantillas profesionales para diferentes industrias: influencers, negocios, artistas, restaurantes y más. ¡Todas 100% personalizables!'
  },
  {
    keywords: ['soporte', 'ayuda', 'problema'],
    response: 'Nuestro equipo de soporte está aquí para ayudarte 24/7. También puedes revisar nuestros tutoriales en video o contactarnos directamente.'
  },
  {
    keywords: ['analytics', 'estadisticas', 'metricas'],
    response: 'Sí! Incluimos analytics detallados: visitantes, clicks por enlace, países de origen, dispositivos y mucho más. Perfecto para optimizar tu estrategia.'
  }
];

export default function LiveChatWidget({ 
  position = 'bottom-right',
  className 
}: LiveChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      text: '¡Hola! 👋 ¿Tienes alguna pregunta sobre EnlacePro? Estoy aquí para ayudarte.',
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show notification when chat is closed and new message arrives
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const findResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    for (const response of predefinedResponses) {
      if (response.keywords.some(keyword => message.includes(keyword))) {
        return response.response;
      }
    }
    
    // Default response
    return 'Gracias por tu mensaje! Un miembro de nuestro equipo se pondrá en contacto contigo pronto. Mientras tanto, puedes revisar nuestras preguntas frecuentes o crear tu página gratis para empezar. 😊';
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Track chat interaction
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'chat_message_sent', {
        event_category: 'engagement',
        event_label: 'live_chat'
      });
    }

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasNewMessage(false);
    
    // Track chat open
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'chat_opened', {
        event_category: 'engagement',
        event_label: 'live_chat'
      });
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  if (!isOpen) {
    return (
      <div className={cn('fixed z-50', positionClasses[position], className)}>
        <button
          onClick={openChat}
          className={cn(
            'relative bg-gradient-to-r from-blue-600 to-purple-600 text-white',
            'w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl',
            'flex items-center justify-center transition-all duration-300',
            'hover:scale-110 active:scale-95',
            'animate-pulse hover:animate-none'
          )}
        >
          <MessageCircle className="w-8 h-8" />
          
          {hasNewMessage && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-xs font-bold">1</span>
            </div>
          )}

          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20 animation-delay-1000"></div>
        </button>
      </div>
    );
  }

  return (
    <div className={cn('fixed z-50', positionClasses[position], className)}>
      <div className={cn(
        'bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 flex flex-col',
        isMinimized 
          ? 'w-80 h-16' 
          : 'w-80 sm:w-80 w-[calc(100vw-2rem)] max-w-sm h-96 sm:h-96 h-[70vh] max-h-[500px]'
      )}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Chat de Soporte</h3>
              <div className="flex items-center text-xs opacity-90">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                En línea
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={toggleMinimize}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors touch-manipulation"
              style={{ minWidth: '40px', minHeight: '40px' }}
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={closeChat}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors touch-manipulation"
              style={{ minWidth: '40px', minHeight: '40px' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: '200px', maxHeight: 'calc(100% - 160px)' }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.isUser ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-xs px-3 py-2 rounded-2xl text-sm',
                      message.isUser
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 pb-2 flex-shrink-0">
              <div className="flex space-x-2 text-xs">
                <button
                  onClick={() => setInputValue('¿Cuánto cuesta?')}
                  className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition-colors touch-manipulation"
                >
                  💰 Precios
                </button>
                <button
                  onClick={() => setInputValue('¿Cómo funciona?')}
                  className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition-colors touch-manipulation"
                >
                  ❓ Cómo funciona
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-3 bg-white flex-shrink-0">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation"
                  style={{ minHeight: '44px' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 px-4 py-2 text-xs text-gray-600 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Phone className="w-3 h-3 mr-1" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    <span>soporte@enlacepro.com</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>24/7</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}