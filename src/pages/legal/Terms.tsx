import LegalPage from '@/components/LegalPage'
import terms from '@/content/legal/terms-of-service.md?raw'

export default function Terms() {
    return <LegalPage content={terms} />
}
