import React from 'react'
import {Nav} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
export default function SideBar() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
              Diger
            </a>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              {/* <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns">Kesfet</CDBSidebarMenuItem>
              </NavLink> */}
              <NavLink exact to="/notificationconsumer" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table">Bildiirmlerim</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Radiological" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">Radyolojik Goruntulerim</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Assay" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">Tahlilerim</CDBSidebarMenuItem>
              </NavLink>
  
              <NavLink exact to="/CalenderConsumer" >
                <CDBSidebarMenuItem icon="exclamation-circle" >Asi Takvimi</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
  
          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '20px 5px',
              }}
            >
              
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
  )
}
