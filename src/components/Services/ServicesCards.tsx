import { services } from '../../utils/constants';

export const ServicesCards = () => {
  return (
    <div className='services-center'>
      {services.map(({ id, icon, title, text }) => {
        return (
          <article key={id} className='service'>
            <span className='icon'>{icon}</span>
            <h4>{title}</h4>
            <p>{text}</p>
          </article>
        );
      })}
    </div>
  );
};
