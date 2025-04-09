import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

interface ChatFeedbackProps {
  onClose: () => void
  onSkip: () => void
}

export default function ChatFeedback({ onClose, onSkip }: ChatFeedbackProps) {
  const [rating, setRating] = useState<number>(0)
  const [isEasyToUse, setIsEasyToUse] = useState<boolean | null>(null)
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    // Aqui você pode implementar a lógica para salvar o feedback
    console.log({ rating, isEasyToUse, comment })
    onClose()
  }

  return (
    <Card className="w-full h-[calc(100vh-2rem)] md:w-[400px] md:h-auto p-4 md:p-6 space-y-6 flex flex-col md:rounded-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Feedback</h3>
          <button 
            onClick={onSkip}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Você ficou satisfeito com o atendimento?</h3>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => setRating(value)}
                className={`w-10 h-10 rounded-full border ${
                  rating === value
                    ? 'bg-[#0066FF] text-white border-[#0066FF]'
                    : 'border-gray-300 hover:border-[#0066FF]'
                } transition-colors`}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Insatisfeito</span>
            <span>Muito satisfeito</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Foi fácil utilizar o chat?</h3>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setIsEasyToUse(false)}
            className={`p-3 rounded-full border ${
              isEasyToUse === false
                ? 'bg-[#0066FF] text-white border-[#0066FF]'
                : 'border-gray-300 hover:border-[#0066FF]'
            } transition-colors`}
          >
            <i className="fas fa-thumbs-down text-xl"></i>
          </button>
          <button
            onClick={() => setIsEasyToUse(true)}
            className={`p-3 rounded-full border ${
              isEasyToUse === true
                ? 'bg-[#0066FF] text-white border-[#0066FF]'
                : 'border-gray-300 hover:border-[#0066FF]'
            } transition-colors`}
          >
            <i className="fas fa-thumbs-up text-xl"></i>
          </button>
        </div>
      </div>

      <div className="space-y-2 flex-1">
        <h3 className="text-lg font-medium">Comentários adicionais (opcional)</h3>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Compartilhe sua experiência ou sugestões..."
          className="w-full resize-none flex-1 min-h-[120px] max-h-[200px]"
        />
      </div>

      <div className="flex gap-2 justify-end mt-4">
        <Button
          onClick={onSkip}
          variant="outline"
          className="bg-transparent hover:bg-gray-100"
        >
          Pular
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-[#0066FF] hover:bg-[#0052CC] text-white"
        >
          Enviar Feedback
        </Button>
      </div>
    </Card>
  )
} 