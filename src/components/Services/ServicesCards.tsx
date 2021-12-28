import { Link } from 'react-router-dom'
import { useFilterContext } from '../../context/filter_context'
import { services } from '../../utils/constants'

export const ServicesCards = () => {
  const { updateFilters, handleClickFromServices, clearFilters } =
    useFilterContext()
  return (
    <div className='services-center'>
      {services.map(({ id, icon, title }) => {
        return (
          <article key={id} className='service'>
            <span className='icon'>{icon}</span>
            <h4>{title}</h4>
            <Link to='/products'>
              <button
                className='btn'
                type='button'
                name='home-page-category'
                value={title}
                onClick={e => {
                  clearFilters()
                  handleClickFromServices()
                  updateFilters(e)
                }}
              >
                click here for {title}
              </button>
            </Link>
          </article>
        )
      })}
    </div>
  )
}
