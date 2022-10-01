import { useRef } from 'react';
import './cv.scss';

function CV() {
  const aboutMeRef = useRef(null);
  const workExperienceRef = useRef(null);
  const educationRef = useRef(null);
  const skillsRef = useRef(null);

  const scroolTo = (el: React.MutableRefObject<any>) => {
    el.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="CV_MainContainer">
      <div className="CV_Sections">
        <div className="CV_AboutMe" ref={aboutMeRef}>
          <p className="app_font_l">ABOUT ME</p>
          <div className="CV_Description">
            <p className="app_font_s">
              Web Developer fullstack. Experienced with all stages of the development cycle for
              dynamic web projects.
            </p>
            <p className="app_font_s">
              Well-versed in programming languages as C#.NET and Js/Ts (using frameworks as
              Angular and React)
            </p>
          </div>
        </div>
        <div className="CV_WorkExperiences" ref={workExperienceRef}>
          <p className="app_font_l">WORK EXPERIENCE</p>

          <div className="CV_WorkExperience">
            <div className="CV_WorkExperiences_Time">
              <p className="app_font_m app_font_noMargin">
                {' '}
                <b>01/03/2021</b>
                {' '}
                -
                {' '}
                <b>CURRENT</b>
                {' '}
                - Remote, Spain
                {' '}
              </p>
            </div>
            <div className="CV_WorkExperiences_Company">
              <p className="app_font_m app_font_noMargin"> Front-end Web Developer </p>
              <p className="app_font_m"> UST </p>
              <p className="app_font_s">
                Currently working in the development of an e-commerce application with
                which we offer finance for different kind of products and merchants,
                integrating our own widgets in several sell points.
              </p>
              <p className="app_font_s">
                In addition, a portal application was developed to offered easy
                management and control of finances to merchants.
              </p>
              <ul>
                <li>
                  <p className="app_font_s">
                    Develop front-end applications using Angular latest versions
                  </p>
                </li>
                <li>
                  <p className="app_font_s">
                    Unit and integrations tests has been generated with Jest, otherwise
                    end2end tests has been generated with Cypress
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="CV_WorkExperience">
            <div className="CV_WorkExperiences_Time">
              <p className="app_font_m app_font_noMargin">
                {' '}
                <b>01/09/2018</b>
                {' '}
                -
                {' '}
                <b>01/03/2021</b>
                {' '}
                - San Cristobal de La Laguna, Spain
                {' '}
              </p>
            </div>
            <div className="CV_WorkExperiences_Company">
              <p className="app_font_m app_font_noMargin"> Fullstack Web Developer </p>
              <p className="app_font_m"> Ultebra Solutins SL </p>
              <p className="app_font_s">
                Develop a suite of applications focused on the automotive market. This set of
                applicationscould be used standalone or together to offer our clients metrics
                and data that help them in their vehicle licensing and leasing strategies
              </p>
              <ul>
                <li>
                  <p className="app_font_s">
                    Develop front-end applications using Angular latest version.
                  </p>
                </li>
                <li>
                  <p className="app_font_s">
                    Develop back-end API REST using C# .NET latest version.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="CV_Educations" ref={educationRef}>
          <p className="app_font_l">EDUCATION AND TRAINING</p>
          <div className="CV_Education">
            <p className="app_font_m app_font_noMargin">Grado en Ingeniería Informática</p>
            <p className="app_font_s app_font_noMargin">Universidad de La Laguna</p>
          </div>
          <div className="CV_Education">
            <p className="app_font_m app_font_noMargin">Testing web applications</p>
            <p className="app_font_s app_font_noMargin">TrainingIT</p>
          </div>
        </div>
        <div className="CV_Skills" ref={skillsRef}>
          <p className="app_font_l">SKILLS</p>

        </div>
      </div>
      <div className="CV_Summary">
        <div
          role="button"
          tabIndex={0}
          className="CV_SummaryEle app_font_m"
          onClick={() => scroolTo(aboutMeRef)}
        >
          About Me

        </div>
        <div
          role="button"
          tabIndex={0}
          className="CV_SummaryEle app_font_m"
          onClick={() => scroolTo(workExperienceRef)}
        >
          Work Experience

        </div>
        <div
          role="button"
          tabIndex={0}
          className="CV_SummaryEle app_font_m"
          onClick={() => scroolTo(educationRef)}
        >
          Education

        </div>
        <div
          role="button"
          tabIndex={0}
          className="CV_SummaryEle app_font_m"
          onClick={() => scroolTo(skillsRef)}
        >
          Skills

        </div>
      </div>
    </div>
  );
}

export default CV;
