import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ContentWrapper, Navigation, NavigationButtons, NavigationElement, NavigationHeader, NavigationLabels, NavigationSubtitle, Wrapper } from './Content.styled'

const Content = (props) => {
    let location  = useLocation();
    let navigation = useNavigate();
    const [pathElements, setPathElements] = useState();

    useEffect(() => {
        setPathElements(location.pathname.split('/')?.filter((item) => item != ''));
    }, [location]);


    return (
        <Wrapper>
            <Navigation>
                <NavigationLabels>
                    <NavigationHeader>{pathElements && pathElements?.length == 0 ? 'Book' : pathElements?.length > 0  && pathElements[0] ? pathElements[0] : ''}</NavigationHeader>
                    <NavigationSubtitle>Reservations  <NavigationElement >{pathElements && pathElements?.length == 0 ? 'Book' : pathElements?.length > 0  && pathElements[0] ? pathElements[0] : ''}</NavigationElement></NavigationSubtitle>
                </NavigationLabels>
                <NavigationButtons>
                    {props.buttons}
                </NavigationButtons>
            </Navigation>
            <ContentWrapper>
                {props.children}
            </ContentWrapper>
        </Wrapper>
    )
}

export default Content