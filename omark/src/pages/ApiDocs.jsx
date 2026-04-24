import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default function ApiDocs() {
  return (
    <div style={{ padding: '20px' }}>
      <SwaggerUI url={process.env.VITE_APP_SWAGGER_URL} />
    </div>
  )
}