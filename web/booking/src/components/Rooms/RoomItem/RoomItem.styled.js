import styled from "styled-components";




export const Wrapper = styled.div`
    width: 100%;
    border: 1px solid #e9ebec;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    overflow: hidden;
    padding-bottom: 10px;
    cursor: pointer;
`

export const Header = styled.div`
    width: 100%;
    height: 150px;
    position: relative;
`;

export const Image = styled.div`
    width: 100%;
    height: 100%;
    background: url(${props => props.src});
    background-size: cover;
    background-position: center;
    background-repeat:no-repeat;
    border-bottom: 2px solid #ddd;
`

export const AvailabilityStatus = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 10px;
    background-color: #fafafa;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    padding: 0 5px;
    font-size: 14px;
    font-weight: 500;
    color: ${props => props.status === true ? "#28a745":"#dc3545"};

    ::before{
        position: relative;
        content: '';
        width: 10px;
        height: 10px;
        background-color: ${props => props.status === true ? "#28a745":"#dc3545"};
        display: block;
        margin-right: 5px;
        border-radius: 50%;;
    }

`;


export const Content = styled.div`
    width: 100%;
    padding: 20px 0 5px 0px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
`;

export const RoomName = styled.div`
    position: absolute;
    height: 30px;
    background: #6574f5;
    padding-left: 10px;
    font-size: 18px;
    padding-right: 40px;
    bottom: -12px;
    border-radius: 0 10px 10px 0;
    left: 0;
    color: #fff;
    max-width: 95%;
    min-width: 45%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const Capacity = styled.div`
    width: 100%;
    color: #8a8a8a;
    padding: 0 10px;
    font-size: 15px;

    .MuiSvgIcon-root{
        position: relative;
        font-size: 20px;
        margin-right: 5px;
        top: -2px;
    }
`;

export const CapacityValue = styled.span`
    font-weight: 500;
`;

export const Equipment = styled.div`
    width: 100%;
    color: #8a8a8a;
    padding: 0 10px;
    font-size: 15px;

    .MuiSvgIcon-root{
        position: relative;
        font-size: 20px;
        margin-right: 5px;
        top: 0px;
    }
`;

export const EquipmentIcon = styled.img`
    width: 18px;
    height: 18px;
    object-fit: contain;
    margin-right: 5px;
    filter: invert(44%) sepia(1%) saturate(2770%) hue-rotate(319deg) brightness(89%) contrast(88%);
`